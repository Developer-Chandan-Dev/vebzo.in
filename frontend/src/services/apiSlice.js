import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${VITE_API_URL}/api/v1`,
        credentials: 'include', // sends cookies with request
    }),
    tagTypes: ['Order'], // Optional: for cache invalidation
    endpoints: (builder) => ({
        // GET : fetch my order
        fetchMyOrders: builder.query({
            query: (params) => ({
                url: 'orders/my-orders',
                method: 'GET',
                params: params || {}
            }),
            providesTags: ['Order'], // optional for catching
        }),

        // PUT : changing order status
        updateOrder: builder.mutation({
            query: ({ orderId, updateData }) => ({
                url: `orders/${orderId}/status`,
                method: "PUT",
                body: updateData, // e.g., { status: "Delivered"}
            }),
            invalidatesTags: ['Order']
        }),

        // DELETE : deleting a order
        deleteOrder: builder.mutation({
            query: ( orderId ) => ({
                url: `orders/my-orders/${orderId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Order']
        })
    })
});

export const {
    useFetchMyOrdersQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation
} = apiSlice;