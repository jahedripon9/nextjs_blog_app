const { NextResponse } = require("next/server")

export async function GET(request) {
    console.log("Blog Get IT")
    return NextResponse.json({msg:"API Working"})
    
}