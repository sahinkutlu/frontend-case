const DataService = {
  getData: async (): Promise<string[]> => {
    try {
      const response = await fetch("/src/assets/items.json");

      if (!response.ok) {
        throw new Error("Veri alınamadı");
      }

      const data = await response.json();

      return data.data;
    } catch (error) {
      throw new Error("Veri alınırken bir hata oluştu: " + error);
    }
  },
};

export default DataService;
