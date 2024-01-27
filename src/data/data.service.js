import {useQuery} from "@tanstack/react-query"
import {getAdminsList, getBrands, getCategories, getClients, getNews, getPartners, getProducts, getSecondsubcategories, getSubCategoriesById, getSubcategories} from "./data.fn"


// CATEGORIES


export const useCategories = () => useQuery({queryFn: getCategories, queryKey: ["categories"]})



//  SUBCATEGORIES


export const useSubcategories = () => useQuery({queryFn: getSubcategories, queryKey: ["subcategories"]})


export const useSubCategoriesById = (id) => useQuery({queryFn: () => getSubCategoriesById(id), queryKey: ["subcategoriesById"]})






//  BRANDS


export const useBrands = (params) => useQuery({queryFn: () => getBrands(params), queryKey: ["brands"]})




//  NEWS


export const useNews = (params) => useQuery({queryFn: () => getNews(params), queryKey: ["news"]})



//  CLIENTS


export const useClients = () => useQuery({queryFn:  getClients, queryKey: ["clients"]})




//  PARTNERS


export const usePartners = (params) => useQuery({queryFn:  () => getPartners(params), queryKey: ["partners", params?.limit, params?.page]})






//  PRODUCTS


export const useProducts = (params) => useQuery({queryFn: () => getProducts(params), queryKey: ["products"]})


// ME

export const useAdmins = () => useQuery({queryFn: getAdminsList, queryKey: ["admins"]})