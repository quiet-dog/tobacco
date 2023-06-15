import myRequest from ".."
// login
export function loginApi(data: any) {
    return myRequest({
        url: "/api/login",
        method: "post",
        data
    })
}