import axios from "axios";
import { buildAuthHeaders } from "./auth";

const getAllProducts = async () => {
    try {
        const headers = buildAuthHeaders();

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_APP_URI}/api/product`,
            headers
        )

        return response.status === 200 ? response.data.data : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

const deleteAProduct = async (id: string) => {
    try {
        const headers = buildAuthHeaders();

        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_APP_URI}/api/product?id=${id}`,
            headers
        )

        return response.status === 200 ? true : false;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export { getAllProducts, deleteAProduct };
