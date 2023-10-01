import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export async function GET( request : NextRequest) {
    const requestURL = new URL(request.url);
    const code = requestURL.searchParams.get('code'); //accede al query string sin tener que utilizar regex
    
    if (code !== null) {
        const supabase = createRouteHandlerClient({ cookies });
        //usando el codigo que le pasamos por URL
        // nos devuelve la sesion de usuario
        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(requestURL.origin); //redirecciona a la pagina que estaba antes de loguearse a ver.
}