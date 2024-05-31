/**
 * Check whether the current browser is based on Chrome.
 * @returns Whether or not the current user agency indicates a Chromium-based browser.
 */
const isChromium = () => navigator.userAgent.includes('Chrome');

/**
 * Available error messages.
 */
const errMessages = {
  stack: 'No stack available',
  parse: 'Unable to parse caller from stack',
}

/**
 * Convert the available error messages into a list of error messages.
 */
const allErrMessages = Object.values(errMessages);

/**
 * Parses an error stack trace to identify where the debug function is being called.
 * @param stack The stack trace string retrieved from an error.
 * @returns The line from the stack trace corresponding to the debug invocation or one of the error messages described in the above errMessages object.
 */
const getCallerFromStack = (stack: Error["stack"]) => {
  
  if (!stack) {
    return errMessages.stack;
  }

  let lines = [] as string[];

  if ( isChromium() ) {
    // This is the delimiter for stack entries in Chrome.
    lines = stack.split('    at ');

    // In Chrome-based browsers, the first line of the stack is the Error header
    // and the second line should be the debug function. It then
    // stands to reason that the function invoking the debug function
    // will be third in the stack.
    if ( lines.length >= 2 ) {
      return lines[2];
    }
  } else {
    // Firefox and Safari use a simple line break as the stack entry delimiter.
    lines = stack.split('\n');

    // Non-Chromium browsers do not have a header for the stack trace.
    if ( lines.length >= 1 ) {
      return lines[1];
    }
  }

  return errMessages.parse;
}


/**
 * Derive a more readable name for the source file where the function is being called.
 * @param location The raw location of the function source as identified in the stack trace.
 * @returns The provided location shorn of some extraneous information.
 */
const simplifySource = (location: string) => {
  if ( !location ) {
    return 'UNKNOWN';
  }

  const noUrl = location.replace(`${window.location.origin}/src/`, '');

  const noQueryParams = noUrl.split('?')[0];

  return noQueryParams;
}

/**
 * Derive a more readable name for the function is being called.
 * @param func The raw function name as identified in the stack trace.
 * @param source The file where the function resides.
 * @returns A more readable version of the provided function name.
 */
const simplifyFunc = (func: string, source: string) => {
  if (!func) {
    return 'UNKNOWN';
  }

  // This is how the call of a component looks in Chrome, so in
  // this case we derive the component name from the source file.
  if ( func === '_$$component.location' ) {
    const removeExt = source.replace('.tsx', '');
    const parts = removeExt.split('/');

    return parts[parts.length - 1];
  }

  if ( func.includes( '<anonymous>' ) ) {
    return 'anonymous';
  }

  if ( func.includes( 'createEffect' ) ) {
    return 'createEffect';
  }

  // Firefox separates the end of the function name with a '>'
  // so we only return the first part of the func value.
  if ( func.includes('<') ) {
    const parts = func.split('<');

    return parts[0].replace('/', '');
  }

  return func;
}

/**
 * Get additional details about where the debug function is being called.
 * @param err An Error that is used to extract the stack trace.
 * @returns Function call details including the function name, source file, and source component if applicable.
 */
const getFunctionCaller = (err: Error) => {
  const caller = getCallerFromStack(err.stack);

  // Short circuit if error message is received.
  if ( allErrMessages.includes(caller) ) {
    return { 
      component: undefined,
      func: 'UNKNOWN',
      source: `UNKNOWN - ${caller}`
    };
  }

  let parts: string[];

  // Different browsers format stack entries differently.
  if ( isChromium() ) {
    parts = caller.split(' (');
  } else {
    parts = caller.split('@');
  }

  const source = simplifySource(parts[1]);

  return {
    component: source.startsWith('components') ? source.replace('components/', '') : undefined,
    func: simplifyFunc(parts[0], source),
    source,
  };
}

/**
 * Serializes the most common data types so that it can be
 * printed to the console in a more readable format.
 * @param data Data to be logged by the debugger.
 * @returns A serialized version of the data.
 */
const parseData = (data: any) => {
  // Explicitly identify undefined (as opposed to null)
  if ( typeof data === 'undefined' ) {
    return 'undefined';
  }

  // Identify when the data is a function.
  if ( typeof data === 'function') {
    return `function - ${data.name ? `${data.name}()` : 'anonymous'}`;
  }

  // Handle weird number edge cases.
  if ( typeof data === 'number' ) {
    if ( Number.isNaN(data) ) {
      return 'NaN';
    } else if ( data === 0 && 1 / data === -Infinity ) {
      return '-0';
    } else if ( !Number.isFinite(data) ) {
      return data === Number.NEGATIVE_INFINITY ? '-Infinity' : 'Infinity';
    } else {
      return data;
    }
  }

  // Identify BigInteger types.
  if ( typeof data === 'bigint' ) {
    return `BigInt - ${data.toString()}n`;
  }

  // Handle simple Maps and Sets.
  if ( data instanceof Map ) {
    // return `Map - ${JSON.stringify([...data])}`;
    return { Map: [...data] };
  }

  if ( data instanceof Set ) {
    // return `Set - ${JSON.stringify([...data])}`;
    return { Set: [...data] };
  }

  // Standard JSON.stringify for everything else.
  return JSON.parse(JSON.stringify(data));
}

/**
 * Print an much more readable version of the provided data to the console to assist in debugging.
 * @param data The information to be logged to the console.
 * @param note An optional memo to provide additional context for debugging.
 */
export const debug = (
  data: any,
  note: string = ''
) => {
  const { func, component, source } = getFunctionCaller(new Error());

  const output = {
    data: parseData(data),
    source,
    component,
    'function': func,
    note,
  } as {
    data: string
    source?: string
    component?: string
    function: string
    note: string
  };

  // Only list one of source or component.
  if ( !component ) {
    delete output.component;
  } else {
    delete output.source;
  };

  console.log(JSON.stringify(output, null, 2));
}