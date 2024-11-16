import {connectDB} from "../db";


export const searchByWord = async (req:any, res: any) => {
    try {
        let {input} = req.query;
        const excludedWords: Set<string> = new Set([
            "el", "la", "lo", "los", "las", "en", "un", "una", "unos", "unas", "a", "ante", "bajo",
            "cabe", "con", "contra", "de", "desde", "entre", "hacia", "hasta", "para", "por", "según", 
            "sin", "so", "sobre", "tras", "y", "o", "u", "es", "son", "ser", "se", "como", "de", "ha", 
            "que", "del", "su", "#", "##", "###", "####", "#####", "######"
        ]);
        let words = input.text.split(/\s+/);
        words = words.filter((word: string) => !excludedWords.has(word.toLowerCase()));
        words = Array.from(new Set(words));
        

        let temp: any;
        let result: Array<any> = new Array();
        for (const word of words) {
            temp = await connectDB("CALL searchByWord(?);", word);
            result.push(temp)
        }
        console.log(result);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({message: "No se pudo buscar", error: error.message});
    }
}