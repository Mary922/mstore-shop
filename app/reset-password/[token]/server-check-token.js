import {checkTokenNotExpired} from "@/app/lib/api/forgotPassword";
import ExpiredToken from "@/app/reset-password/[token]/expired";

export default async function ServerCheckToken({token}) {
    console.log('token here', token);

    const isValid = await checkTokenNotExpired(token);
    console.log('isValid', isValid);

    if (!isValid?.success) {
        return <ExpiredToken/>
    }
    return null;
}