const fromIds = ( ids: string[], list: IAuthor[] ) => {
  const suggestions = [] as ITypeAheadSuggestion[];

  ids.forEach( i => {
    const author = list.find( a => a.id === i );

    if ( author ) {
      suggestions.push({ id: author.id, name: author.nameFull || '' });
    }
  });

  return suggestions;
}

const fromAuthors = ( authors: IAuthor[] ): ITypeAheadSuggestion[] => authors.map(a => ({ id: a.id, name: a.nameFull || '' }));

export const authorSuggestions = {
  fromAuthors,
  fromIds,
}

/**
 * Returns a space-separated combination of two provided strings.
 * If one of the strings is empty it will only return the one that has a value.
 * @param first The name that should be listed first.
 * @param last The name that should be listed second.
 * @return A space-separated combination of the two provided names.
 */
export const constructFullName = (first: string = '', last: string = ''): string => {
  if ( first && last ) {
    return `${first} ${last}`;
  }

  return `${first}${last}`;
}

export const getAuthorFullNames = ( ids: string[], list: IAuthor[] ): string => {
  if ( Array.isArray(list) && list.length > 0 ) {
    const names = ids.map( i => list.find( a => a.id === i )?.nameFull || "" );

    return names.join( ", ");
  }

  return "";
}