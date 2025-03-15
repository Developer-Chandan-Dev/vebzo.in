import { useEffect } from "react";


const useUsersTable = ({ currentPage, setCurrentPage, searchTerm, setSearchText, checkRoleFilter, setRole, setCheckRoleFilter, checkStatusFilter, setStatus, setCheckStatusFilter }) => {

    useEffect(() => {
        if (searchTerm === "" || searchTerm === null) {
            handleSetSearchText();
        }
    }, [setSearchText, searchTerm]);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    }

    const handleSetSearchText = () => {
        setSearchText(searchTerm.trim());
    }

    const handleEnterKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSetSearchText(); // Trigger the search function when Enter key pressed
        }
    }
    const handleToggleRoleFilter = () => {
        if (checkRoleFilter === true) {
            setCheckRoleFilter(false);
            setRole("");
        } else {
            setCheckRoleFilter(true);
        }
    };

    const handleToggleStatusFilter = () => {
        if (checkStatusFilter === true) {
            setCheckStatusFilter(false);
            setStatus("");
        } else {
            setCheckStatusFilter(true);
        }
    };

    const handleFilterByRole = (e) => {
        setRole(e.target.value);
        handlePageClick(1);
    };
    const handleFilterByStatus = (e) => {
        setStatus(e.target.value);
        handlePageClick(1);
    };



    return { handlePageClick, handleSetSearchText, handleEnterKeyPress, handleToggleRoleFilter, handleFilterByRole, handleToggleStatusFilter, handleFilterByStatus }
}

export default useUsersTable
