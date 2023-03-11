export const style = (error: any) => {
    if (error) {
        return {
            border: "1px solid #EC4F4F",
            boxShadow: "none"
        };
    }
    return {}
}
