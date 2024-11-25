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

export const getWordTotalCount = async (req:any, res:any) => {
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
  
        temp = await connectDB("CALL GetWordTotalCount(?);", words[0]);
        result.push(temp)
        
        console.log(result[0][0].total_count);
        res.json(result[0][0]);

	} catch (e:any){
        	res.status(500).json({message: "No se pudo buscar total palabras", error: e.message});
	}
}

export const getWordContTag_page = async (req:any, res:any) => {
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
  
        temp = await connectDB("CALL GetWordContTagCountInPage(?);", words[0] + " " + words[1]);
        result.push(temp)
        
        res.json(result);

	} catch (e:any){
        	res.status(500).json({message: "No se pudo buscar total palabras", error: e.message});
	}
}

export const getWordTag_page = async (req:any, res:any) => {
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
  
        temp = await connectDB("CALL GetWordTagCountInPage(?);", words[0]);
        result.push(temp)
        
        console.log(result);
        res.json(result);

	} catch (e:any){
        	res.status(500).json({message: "No se pudo buscar total palabras", error: e.message});
            console.log(e);
	}
}

export const getWordPercentageInPage = async (req:any, res:any) => {
    try {
        let { input } = req.query;
        let pageId = input;

        if (!pageId) {
            return res.status(400).json({ message: "No se proporcionó el ID de la página" });
        }

        let temp: any;
        let result: Array<any> = new Array();

        temp = await connectDB("CALL GetWordPercentageInPage(?);", pageId);

        for (const row of Array.from(temp)) {
            result.push(row);
        }

        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: "No se pudo obtener el porcentaje de palabras", error: error.message });
    }
};


export const getTopTagsWithMostDistinctWords = async (req: any, res: any) => {
    try {
        let { input } = req.query;
        let pageId = input;

        if (!pageId) {
            return res.status(400).json({ message: "No se proporcionó el ID de la página" });
        }

        let temp: any;
        let result: Array<any> = new Array();

        temp = await connectDB("CALL GetTopTagsByDistinctWords(?);", pageId);

        for (const row of Array.from(temp)) {
            result.push(row);
        }

        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: "No se pudo obtener los TAGs con más palabras distintas", error: error.message });
        console.log(error);
    }
};

export const getTopTagsWithMostText = async (req: any, res: any) => {
    try {
        let { input } = req.query;
        let pageId = input;

        if (!pageId) {
            return res.status(400).json({ message: "No se proporcionó el ID de la página" });
        }

        let result: any;
        result = await connectDB("CALL GetTopTagsByTextCount(?);", pageId);



        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: "No se pudo obtener los TAGs con más texto", error: error.message });
        console.log(error);
    }
};

export const findPageByUrl = async (req: any, res: any) => {
    try {
        const { input } = req.query;
        const url = input;

        if (!url) {
            return res.status(400).json({ message: "No se proporcionó el URL." });
        }

        let result: any;
        result = await connectDB("SELECT id FROM Page WHERE url = ?", url);

        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Error al buscar la página por URL", error: error.message });
        console.log(error);
    }
};