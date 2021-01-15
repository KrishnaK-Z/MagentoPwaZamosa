import { gql } from '@apollo/client';

export const GET_TOP_NAV = gql`
    query getMegaMenu {
        categoryList {
            id
            name
            children {
                id
                include_in_menu
                name
                position
                url_path
                url_suffix
                children_count
                children {
                    id
                    include_in_menu
                    name
                    position
                    url_path
                    url_suffix
                    children_count
                    children {
                        id
                        include_in_menu
                        name
                        position
                        url_path
                        url_suffix
                        children_count
                        children {
                            id
                            include_in_menu
                            name
                            position
                            url_path
                            url_suffix
                            children_count
                        }
                    }
                }
            }
        }
    }
`;

export default {
    getTopNavQuery: GET_TOP_NAV
}
