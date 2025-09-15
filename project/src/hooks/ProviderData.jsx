import { useEffect, useState } from "react";
import { useGetProvidersQuery } from "../store/provider/providerApi";

export default function useProviderData() {
    const [userData, setUserData] = useState({}); 
    const user = JSON.parse(localStorage.getItem("user"));
    const { data: providersData } = useGetProvidersQuery();

    useEffect(() => {
        const viewDetails = (itemId) => {
            let eData =
                providersData &&
                providersData.find((item) => {
                    return item?._id === itemId;
                });
            setUserData(eData);
        };

        viewDetails(user?.id);
    }, [providersData, user?.id]);

    return userData;
}
