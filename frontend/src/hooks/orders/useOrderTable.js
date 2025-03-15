
const useOrderTable = ({ setCurrentPage, checkStatusFilter, setStatus, setCheckStatusFilter, checkPaymentStatusFilter,
    setPaymentStatus,
    setCheckPaymentStatusFilter, setStartDate,
    setEndDate,
    setCheckDateFilter,
    checkDateFilter }) => {

    const handlePageClick = (page) => {
        setCurrentPage(page);
    }
    const handleToggleStatusFilter = () => {
        if (checkStatusFilter === true) {
            setCheckStatusFilter(false);
            setStatus("");
        } else {
            setCheckStatusFilter(true);
        }
    };

    const handleFilterByStatus = (e) => {
        setStatus(e.target.value);
        handlePageClick(1);
    };

    const handleTogglePaymentStatusFilter = () => {
        if (checkPaymentStatusFilter === true) {
            setCheckPaymentStatusFilter(false);
            setPaymentStatus("");
        } else {
            setCheckPaymentStatusFilter(true);
        }
    }

    const handleFilterByPaymentStatus = (e) => {
        setPaymentStatus(e.target.value);
        handlePageClick(1);
    }

    const handleToggleDateFilter = ()=>{
        if(checkDateFilter === true){
            setCheckDateFilter(false);
            setStartDate("");
            setEndDate("");
        }
    }
    const handleFilterByDate = (e)=>{
        
    }

    return { handleToggleStatusFilter, handleFilterByStatus, handleTogglePaymentStatusFilter, handleFilterByPaymentStatus }
}

export default useOrderTable
