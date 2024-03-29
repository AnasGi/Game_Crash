import React, { useState } from 'react'
import Prompt from './prompt'
import img1 from '../pics/lvl1.webp'
import img2 from '../pics/lvl2.jpg'
import img3 from '../pics/lvl3.webp'
import img4 from '../pics/lvl4.webp'
import img5 from '../pics/lvl5.jpg'
import img6 from '../pics/lvl6.jpg'
import img7 from '../pics/lvl7.jpg'
import img8 from '../pics/lvl8.webp'
import img9 from '../pics/lvl9.jpg'
import img10 from '../pics/lvl10.jpg'
import Tutorial from './tuto'
import { Link } from 'react-router-dom'


const words = [
    {"category" : "body parts" , "letters" : ["ARM" , "LEG"] , "image" : img1}, //body parts
    {"category": "animals" , "letters" : ["CAT" , 'DOG' , "FOX"] , "image" : img2}, //animals
    {"category": "summer" , "letters" : ["HOT" , "SUN" , "BEACH" , "HAT"] , "image" : img3}, //summer
    {"category": "kitchen" , "letters" : ["KNIFE" , "DISH" , "PAN" , "OVEN" , "SALT"] , "image" : img4}, //kitchen
    {"category": "gaming" , "letters" : ["GAME" , "WIN" , 'PLAY' , "FUN" , "SCORE"] , "image" : img5},//gaming
    {"category": "gym" , "letters" : ["DUMBLE" , "CARDIO" , "TRAINER" , 'SQUAT' , "FITNESS"] , "image" : img6},//gym
    {"category": "pc parts" , "letters" : ["RAM" , "SCREEN" , "CPU" , 'MOUSE' , "KEYBORD" , "PORT" , "CABLE" , "FAN"] , "image" : img7},//pc hardware
    {"category": "nature" , "letters" : ["RIVER" , "FOREST" , "TREE" , 'GRASS' , "SKY" , "SEA" , "FLOWER" , "ROCK"] , "image" : img8},//nature
    {"category": "art" , "letters" : ["ARTIST" , "PAINT" , "GALLERY" , 'BRASH' , "COLOR"] , "image" : img9},//art
    {"category": "cars" , "letters" : ["ENGINE" , "TIRES" , "GEAR" , 'RIDE' , "DRIVER" , "FUEL" , "BRAKE"] , "image" : img10},//cars
] 


export default function Crash() {
    //Our states
    const [answer , setAnswer] = useState("")
    const [warn , setWarn] = useState()
    let [ans , setAns] = useState([])
    let [tries , setTries] = useState(5)
    let [level , setLevel] = useState(0)
    let [key , setKey] = useState(0) //to re-render the app when i didn't pass a level
    let [hints , setHints] = useState(10)
    let [tuto , setTuto] = useState(false)
    

//---------------------------------------------------------------

    let word_tab = [] // containing carrarters of each level
    let ans_tab = [] // containing carrarters of an answer to remove them from page by the help of the splice loop
    //putting these arrays inside th component allow us to empty them each render

//---------------------------------------------------------------

    ans.map((at)=>ans_tab.push(...at)) // i push only the elemnts of [at] into the [ans_tab] (...at not [...at])

    //caracteres loop
    for(let i=0 ; i < words[level].letters.length ; i++){
        for(let j=0 ; j < words[level].letters[i].length ; j++){
            word_tab.push(words[level].letters[i].charAt(j))
        }
    }//loop to push all the caracteres of a level in word_tab to display them
    
    //splice loop
    for (let index = 0; index < ans_tab.length; index++) {
        for (let k = 0; k < word_tab.length; k++) {
            if(ans_tab[index] === word_tab[k]){
                word_tab.splice(k , 1)
                break //if there caracteres that are duplicated we remove the first one only
            }
        }
    } //loop to remove buttons of the letters of a correct answer

    word_tab.sort()

//---------------------------------------------------------------Our functions

    function handleInteractions(){

        let correct = words[level].letters.find(wd=>wd === answer) 
        let dup = ans.find(an=>an === answer) //duplicated word

        if(answer === ""){
            setWarn(()=><p id='warning'><span id='warnin_pointer'></span> type an answer</p>) //passing a function containing html elements in setWarn
        }
        else if(dup !== undefined){
            setWarn(()=><p id='warning'><span id='warnin_pointer'></span> this word is already there</p>)
        }
        else{
            if(correct){
                setAns([...ans , correct])
                setTries(tries<5 ? tries+=1 : tries)
            }
            else{
                setTries(tries>0 ? tries-=1 : tries)
            }
            setWarn('')
        }
        setAnswer('') //to make room for the other answer
        unfocussed_btns()
    }

    function handleHint(level){
        setHints(hints-=1)
         
        const conbineArrays = words[level].letters.concat(ans) //combining [ans] and words[level].letters to spot the duplicates
        const hinted_word = conbineArrays.filter((element)=>conbineArrays.indexOf(element) === conbineArrays.lastIndexOf(element)) 
        //conbineArrays.indexOf(element) represents the index of the first occurrence of the element 
        //conbineArrays.lastindexOf(element) represents the index of the last occurrence of the element 
        //if the first and last occurrences have the same index then its a unique element
           
        setAns([...ans , hinted_word[0]])//pushing the random hinted word into ans table

        if(hints === 0){
            document.getElementById('hint').disabled = true
        }
    }

    function focussed_btns(id){
        document.getElementById(id).style.backgroundColor = "rgb(90, 26, 149)"
        document.getElementById(id).disabled = true //to disable the clicked letter
    }

    function unfocussed_btns(){
        let btns = document.querySelectorAll('.btns>input')
        for (let index = 0; index < btns.length; index++) {
            btns[index].style.backgroundColor = "blue"
            btns[index].disabled = false
        }
    }


//---------------------------------------------------------------
    
    return (
        <div className='container' key={key}>
            {key === 0 && <p id='game_tuto' onClick={()=>setTuto(true)}>HOW TO PLAY ?</p>}
            {(tuto && key === 0) && <Tutorial play={()=>setKey(key+=1)} nbrelvl={words.length}/>}
            {/* key === 0 to show the tutorial once */}
            <form>
                <main>
                    <div className='Links' style={{marginTop : "30px"}}>
                        <div  className='Link_cont'><Link to='/Game_Crash/FanLvl'>Fan made levels</Link></div>
                        <div  className='Link_cont'><Link to='/Game_Crash/AddLvl'>Create your own level</Link></div>
                    </div>
                    <p>{`{ `}Category : <span style={{textTransform : 'uppercase'}}>{words[level].category}</span>{` }`}</p>
                    <header style={{backgroundImage : `url(${words[level].image})`}}><div><p>Level <span key={level}>{level+1}</span></p></div></header>
                    <aside className='infos'>
                        <div id='objective'><span id='pointer'></span><p id='nbre_words'>you have to get {words[level].letters.length - ans.length} word(s)</p></div>
                    </aside>
                </main>
                <article>
                    <p id='tries'>you have <span id='span_try' key={tries} >{tries}</span> tries</p>
                    <div id='warn_cont'>{warn}</div>
                    <section className='inputs'>
                        <fieldset id='answer'>
                            <legend>ANSWER</legend>
                            <input id='answer_inp' type='text' value={answer} disabled/>
                        </fieldset>
                        <div className='ops_btns'>
                            <input id='check' type='button' value={"CHECK"} onClick={handleInteractions} />
                            <input id='hint' type='button' value={`${hints} HINTS`} onClick={()=>handleHint(level)} />
                            <input id='del' type='button' value={"DEL"} onClick={()=>{setAnswer("") ; unfocussed_btns()}} />
                            <input id='restart' type='button' value={"RESTART"} onClick={()=>{window.location.reload() ; alert("Do you want to restart to level 1 ?")}} />
                        </div>
                    </section>
                    <div className='btns'>
                        {
                            word_tab.map((wrd , idx)=>
                            <input 
                                type='button'
                                key={idx} 
                                id={idx}
                                value={wrd} 
                                readOnly 
                                onClick={(e)=>{setAnswer(answer+e.target.value) ; focussed_btns(idx.toString()) }}
                            />)
                        }
                    </div>
                    <footer>
                        <p style={{opacity : .2}}>MADE BY ANAS BOUSSALEM</p>
                    </footer>
                    <hr></hr>
                    <div id='ans_cont'>
                        <ol>
                        {
                            ans.map((a , i)=><li key={i}>{a}</li>)
                        }
                        </ol>
                    </div>
                </article>
            </form>

            {
                tries===0 ? 
                <Prompt 
                    onPassLvl={()=>{setKey(key+1) ; setTries(5)}}
                    lvl={level+1} 
                    lvl_info={"RETRY"} 
                    result={"DIDN'T PASS"}
                />
                : 
                ans.length === words[level].letters.length &&
                <Prompt 
                    onPassLvl={()=>{
                        if(level < words.length-1){
                            setLevel(level+1); 
                            setAns([])
                            setAnswer('')
                            setWarn('')
                        }
                        else{
                            window.location.reload() //if the user completed all the levels
                        }
                    }} 
                    onClick={()=>level < words.length-1 ? words[level].letters : words[words.length-1]} 
                    lvl_info={level < words.length-1 ? "NEXT LEVEL" : "REPLAY"} 
                    result={level < words.length-1 ? "PASS" : "COMPLETED EVERY"}  
                    lvl={level < words.length-1 ? level+1 : ""}
                />
                //onPassLvl didn't accept words[setLevel(level+1)] with setAns([]) in her function  so i add onClick event to handle it
                //level < words.length-1 handle the completion of all the levels if level = words.length-1 that means the complition of all levels
            } 
        </div> 
    )
}

