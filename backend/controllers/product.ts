import { Product } from "../models/Product";

const saveProduct = (data: Record<string, string | undefined | number>) => {
  return Product.findOneAndUpdate(
    { name: data.name, product_url: data.product_url, user: data.user },
    { ...data },
    {
      upsert: true,
    },
  );
};

const getAllProduct = (query: Record<string, string | number>) => {
  return Product.find(query).sort({updatedAt: -1});
};

const getOneProduct = ({ user, id }: Record<string, string | number>) => {
  return Product.findOne({ user, _id: id });
};

const deleteProduct = ({ user, _id }: Record<string, string | number>) => {
  return Product.deleteOne({ user, _id });
};

export { saveProduct, getAllProduct, getOneProduct, deleteProduct };
