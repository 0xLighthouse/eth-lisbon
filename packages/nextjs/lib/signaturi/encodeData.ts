interface IContent {
    title: string
    body: string
    timestamp: string
}

interface IAuthor {
    account: string // EOA, Safe, or AA Contract
    signature?: string // Signature of the message
    // contributor: "0xc6025ED82cf2f3d87595195Ed6a1ae1a5a94Ecee",
    // "signingKey": "{\"crv\":\"P-256\",\"ext\":true,\"key_ops\":[\"verify\"],\"kty\":\"EC\",\"x\":\"usUq2Nv9bvmMgGdcucTiljF852bxihWkJOGQeIxLh0Y\",\"y\":\"NpNNPWlgJnkQHzbyFAewmAB6HNs33KfF54-MJmtPrfE\"}",
    // "signature": "0x58378b25862c575d9a983212a56b5f3cbe49af9d580a590a732b8ca8d3b465a454c53e87f89714ef949e36dfb5045feaad2db6ad2235dd6a83798b50c4fd73441b",
}

interface DataPayload {
    content: IContent
    hash: string,
    authors: IAuthor[],
    version: string // 13-05-2023
}
