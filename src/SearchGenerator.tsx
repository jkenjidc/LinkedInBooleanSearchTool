import React from 'react'
import styles from './SearchGenerator.module.css'

const SearchGenerator = () => {

    function handleButtonClick(command: string) {
        const display = document.getElementById('display');
        let current = display?.innerHTML
        const exclude = (document.getElementById('exclude')as HTMLInputElement).value
        const include = (document.getElementById('include')as HTMLInputElement).value
        const modal = document.getElementById('myModal');
        const message = document.getElementById('modalMessage');
        
        const add = () => {
            if (current === '' && include !== '' ){
                display!.innerHTML = `"${include}"`;
            }else if(include !== ''){
                display!.innerHTML = `"${include}" OR ${current}`;
            }
            (document.getElementById('include')as HTMLInputElement).value = ''
        }

        const ignore = () => {
            if (exclude !== '' && current !== ''){
                display!.innerHTML = `${current} NOT "${exclude}"`;
                (document.getElementById('exclude')as HTMLInputElement).value = '';
            }

        }
    
        switch (command) {
            case 'add':
                add()
                break;
            case 'ignore':
                ignore()
                break;
            case 'clear':
                display!.innerHTML = ''
                break;
            case 'save':
                if (current !== ''){
                    localStorage.setItem('prevResult',current!);
                    modal!.style.display = 'block';
                    message!.innerHTML = "Saved Sucessfully"
                }

                break;
            case 'load':
                const cachedSearch = localStorage.getItem('prevResult');
                display!.innerHTML = cachedSearch as string;
                break;
            case 'copy':
                if (current !== "" && modal){
                    modal.style.display = 'block';
                    navigator.clipboard.writeText(current as string)
                    message!.innerHTML = "Copied Sucessfully"
                }
                break;
            case 'closeModal':
                    modal!.style.display = 'none';
                break;
            default:
                break;
        }
    }
  return (
    
    <div className = {styles.Container}>
        <div className = {styles.Header}><a href="https://www.linkedin.com/help/linkedin/answer/a524335">?</a></div>
        <p id="title" className={styles.Heading}> BOOLEAN SEARCH GENERATOR </p>
        <div className={styles.Buttons}>
            <div className={styles.Inputs}>
                <input className={styles.Include} type="text" placeholder='Type word to include' id="include"/>
                <button  className={styles.IncludeButton} onClick={()=>handleButtonClick('add')}> Include </button>
            </div>
            <div className={styles.Inputs}>
                <input  className={styles.Exclude}type="text" placeholder='Type word to exclude'  id="exclude"/>
                <button  className={styles.ExcludeButton}onClick={()=>handleButtonClick('ignore')}> Exclude </button>
            </div>
        </div>
        <p className = {styles.Display} id="display"/>
        <div className={styles.BottomButtons}>
            <button className = {styles.Clear} onClick={()=>handleButtonClick('clear')}> clear </button>
            <button className = {styles.Save} onClick={()=>handleButtonClick('save')}> save </button>
            <button className = {styles.Load} onClick={()=>handleButtonClick('load')}> load</button>
            <button className = {styles.Copy} onClick={()=>handleButtonClick('copy')}> copy</button>
        </div>
        <div id="myModal" className= {styles.modal}>
            <div className={styles.modalContent}>
            <span onClick={()=>handleButtonClick('closeModal')} className= {styles.close}>&times;</span>
            <p id="modalMessage"></p>
            </div>
        </div>
{/*         <div className = {styles.Footer}>Footer</div>
 */}
        
    </div>
  )
}
export default SearchGenerator