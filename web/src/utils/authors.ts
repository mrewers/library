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

export const getAuthorFullNames = ( ids: string[], list: IAuthor[] ): string => {
  if ( Array.isArray(list) && list.length > 0 ) {
    const names = ids.map( i => list.find( a => a.id === i )?.nameFull || "" );

    return names.join( ", ");
  }

  return "";
}