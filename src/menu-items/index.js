import { CallOutlined, Checklist, ListOutlined } from "@mui/icons-material";

export const menuitems = [
    {
        id : 'orders',
        title : 'orders',
        path  :'/dashboard/orders',
        icon : <ListOutlined />
    },
    {
        id : 'check_template',
        title : 'Check Template',
        path  :'/dashboard/check_template',
        icon : <Checklist />
    },
]