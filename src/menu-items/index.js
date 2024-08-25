import { CallOutlined, Checklist, ListOutlined } from "@mui/icons-material";
import i18n from '../i18n'
export const menuitems = [
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