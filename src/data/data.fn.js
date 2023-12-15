import axios from "../utils/axios";

// ME

export const adminRegister = async (user) =>
  axios
    .post("admin/register", user)
    .then((res) => res.data)
    .catch((err) => err);
export const adminLogin = async (user) =>
  axios
    .post("admin/login", user)
    .then((res) => res.data)
    .catch((err) => err);

export const getAdminsList = async () => {
  const res = await axios.get("/admin/list", {
    headers: {
      token: localStorage.getItem("token"),
    },
    params: {
      limit: 15,
      offset: 0,
    },
  });

  return res.data;
};
// CATEGORIES

export const getCategories = async () =>
  axios
    .get("categories")
    .then((res) => res.data)
    .catch((err) => err);

export const createCategory = async (category) =>
  axios
    .post("category/add", category, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

export const editCategory = async (category) =>
  axios
    .put("category/update", category, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete("category/delete", {
      headers: {
        token: localStorage.getItem("token"),
      },
      data: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
// SUBCATEGORIES

export const getSubCategoriesById = async (id) => {
  try {
    const res = await axios.get("subcategories", {
      params: {
        categoryId: id,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSubcategories = async () =>
  axios
    .get("subcategories")
    .then((res) => res.data)
    .catch((err) => err);

export const createSubcategory = async (subcategory) => {
  const res = await axios.post("subcategory/add", subcategory, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });

  return res.data;
};

export const editSubcategory = async (subcategory) =>
  axios
    .put("subcategory/update", subcategory, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

export const deleteSubcategory = async (id) => {
  try {
    const response = await axios.delete("subcategory/delete", {
      headers: {
        token: localStorage.getItem("token"),
      },
      data: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// BRANDS

export const getBrands = async (params) => {
  return axios
    .get("brands", {
      params
    })
    .then((res) => res.data)
    .catch((err) => err);
};

export const createBrand = async (brand) =>
  axios
    .post("brand/add", brand, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

export const editBrand = async (subcategory) =>
  axios
    .put("brand/update", subcategory, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

export const deleteBrand = async (id) => {
  try {
    const response = await axios.delete("brand/delete", {
      headers: {
        token: localStorage.getItem("token"),
      },
      data: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//  PRODUCTS

export const getProducts = async (params) =>
  axios
    .get("product/list", {
      params,
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

export const createProduct = async (product) =>
  axios
    .post("product/add", product, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

export const editProduct = async (product) => {
  try {
    const res = await axios.put("product/edit", product, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete("product/delete", {
      headers: {
        token: localStorage.getItem("token"),
      },
      data: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// NEWS

export const getNews = async (params) => {
  return axios
    .get("news", {
      params
    })
    .then((res) => res.data)
    .catch((err) => err);
};

export const createNews = async (news) => {
  console.log(Array.from(news.entries()));

  try {
    const res = await axios.post("news/add", news, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const editNews = async (news) => {
  try {
    const res = await axios.put("news/update", news, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteNews = async (id) => {
  try {
    const response = await axios.delete("news/delete", {
      headers: {
        token: localStorage.getItem("token"),
      },
      data: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// CLIENTS

export const getClients = async () => {
  return axios
    .get("clients")
    .then((res) => res.data)
    .catch((err) => err);
};

export const createClient = async (client) => {
  try {
    const res = await axios.post("client/add", client, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const editClient = async (client) => {
  try {
    const res = await axios.put("client/update", client, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteClient = async (id) => {
  try {
    const response = await axios.delete("client/delete", {
      headers: {
        token: localStorage.getItem("token"),
      },
      data: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


// PARTNERS

export const getPartners = async () => {
  return axios
    .get("partners")
    .then((res) => res.data)
    .catch((err) => err);
};

export const createPartner = async (partner) => {
  try {
    const res = await axios.post("partner/add", partner, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const editPartner = async (partner) => {
  try {
    const res = await axios.put("partner/update", partner, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePartner = async (id) => {
  try {
    const response = await axios.delete("partner/delete", {
      headers: {
        token: localStorage.getItem("token"),
      },
      data: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
