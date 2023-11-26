export function orderByDate(array, ord) {
    array.sort((a, b) => {
      switch (ord) {
        case 'asc':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'desc':
          return new Date(b.created_at) - new Date(a.created_at);
      }
      
    });
  }
