import {checkTokenNotExpired} from "@/app/lib/api/forgotPassword";
import ExpiredToken from "@/app/reset-password/[token]/expired";

export default async function ServerCheckToken({token}) {

    const isValid = await checkTokenNotExpired(token);

    if (!isValid?.success) {
        return <ExpiredToken/>
    }
    return null;
}