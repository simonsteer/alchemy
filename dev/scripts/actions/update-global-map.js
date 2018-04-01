export const update_global_map = current_map => ({
    type: 'UPDATE_GLOBAL_MAP',
    payload: {
        key: current_map.meta.key,
        map: current_map.map,
    },
})