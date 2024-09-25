import { Checklist, ListOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
export const useGetMenuItem = () => {
    const {t , i18n} = useTranslation()
    return [
        {
            id : 'orders',
            title : i18n.language === 'en' ? 'orders' : 'الطلبات',
            path  :'/dashboard/orders',
            icon : <ListOutlined />
        },
        {
            id : 'check_template',
            title : i18n.language === 'en' ? 'Check Template' : 'العثور على تيمبلت',
            path  :'/dashboard/check_template',
            icon : <Checklist />
        },
    ]
}