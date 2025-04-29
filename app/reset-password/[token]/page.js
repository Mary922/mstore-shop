import ServerCheckToken from "@/app/reset-password/[token]/server-check-token";
import ChangePasswordForm from "@/app/reset-password/[token]/changePasswordForm";


export default async function ResetPasswordPage({params}) {
    const {token} = await params;
    // const {token} = params;

    const result = await ServerCheckToken(token);

    if (result !== null) {
        return result;
    }

    return <ChangePasswordForm token={token}/>

}