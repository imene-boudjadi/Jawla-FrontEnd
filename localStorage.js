
//pour charger les données du stockage lcoal
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState.admin === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

//pour enregistrer les données dasn le stockage local
export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (error) {
      // Gérer les erreurs de stockage local
    }
  };