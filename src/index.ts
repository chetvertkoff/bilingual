import { writeFile } from "fs/promises";
import { EPub } from 'epub2';
import { JSDOM } from 'jsdom'
import axios from "axios";
import * as fs from "fs";

const bookEpubPath = './book.epub';


(async () => {
    const epub = await EPub.createAsync(bookEpubPath);
    const id = epub.flow[5].id
    const html = await epub.getChapterAsync(id)

    // console.log(html)
    await writeFile('./html.txt', '')
    await writeFile('./html.txt', html)

    const { window: { document } } = new JSDOM(html)
    const pCollection = document.querySelectorAll('p')

    const text = [...pCollection].reduce((prev, next) => {
       return prev +'\n'+ next.textContent
   }, '')

    await writeFile('./text.txt', '')
    await writeFile('./text.txt', text)
})()