//Objective is to design a data structure that adds words and searches if the word
//exists in the dictionary. Words that have '.' can replace it with any letter.

let wordDictionary = new WordDictionary()
wordDictionary.addWord("bad")
wordDictionary.addWord("dad")
wordDictionary.addWord("mad")
wordDictionary.search("pad")
wordDictionary.search("bad")
wordDictionary.search(".ad")
wordDictionary.search("b..")


//Design using a trie to keep track of each word. Then we do a dfs traversal
//down the trie to see if the word exists

class WordDictionary {
    constructor() {
        this.root = {}
    }

    addWord(word) {
        let node = this.root 
    
        for (let char of word) {
            if (!node[char]) {
                node[char] = {}
            }
            node = node[char]
        }
        node.wordEnd = true
    }

    search(word) {
        return this.dfs(word, 0, this.root)
    }

    dfs(word, index, node) {
        if (index == word.length) {
            return node.wordEnd == true
        }

        //If we pass a '.', then we try every key in the trie
        if (word[index] == '.') {
            for (let key in node) {
                if (this.dfs(word, index + 1, node[key])) {
                    return true
                }
            }
        } else {
            if (node[word[index]] != null) {
                return this.dfs(word, index + 1, node[word[index]])
            }
        }

        return false
    }
}