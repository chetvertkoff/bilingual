interface Paragraph {
    full: {
        original: string
        translated: string
    }
}

interface Chapter {
    name: string
    body: Paragraph[]
}