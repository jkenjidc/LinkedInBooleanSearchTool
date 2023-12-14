import React from 'react'
import styles from './SearchGenerator.module.css'

const SearchGenerator = () => {

    function showMessage(message: string) {
        // Create a modal element
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.textAlign = "center";
        modal.innerHTML = `<p>${message}</p>`;
        
        // Append the modal to the body
        document.body.appendChild(modal);
    
        // Add a button to close the modal
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.onclick = () => {
            document.body.removeChild(modal);
        };
        modal.appendChild(closeButton);
    }

    function handleButtonClick(command: string) {
        const display = document.getElementById('display');
        let current = display?.innerHTML
        let exclude = (document.getElementById('exclude')as HTMLInputElement).value
        let include = (document.getElementById('include')as HTMLInputElement).value

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
                display!.innerHTML = `${current} AND NOT "${exclude}"`;
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
                }
                break;
            case 'load':
                const cachedSearch = localStorage.getItem('prevResult');
                display!.innerHTML = cachedSearch as string;
                break;
            case 'copy':
                if (current !== undefined){
                    navigator.clipboard.writeText(display!.innerHTML);
                    showMessage('Copied Sucessfully');
                }
                break;
            default:
                break;
        }
    }
  return (
    
    <div className = {styles.Container}>
        <p id="title" className={styles.Heading}> BOOLEAN SEARCH GENERATOR </p>
        <div className={styles.Buttons}>
            <div className={styles.Inputs}>
                <input className={styles.Include} type="text" placeholder='Type word to include' id="include"/>
                <button  className={styles.Include} onClick={()=>handleButtonClick('add')}> Include </button>
            </div>
            <div className={styles.Inputs}>
                <input  className={styles.Exclude}type="text" placeholder='Type word to exclude'  id="exclude"/>
                <button  className={styles.Exclude}onClick={()=>handleButtonClick('ignore')}> Exclude </button>
            </div>
        </div>
        <p className = {styles.Display} id="display"/>
        <div className={styles.Buttons}>
            <button className = {styles.Clear} onClick={()=>handleButtonClick('clear')}> clear </button>
            <button className = {styles.Save} onClick={()=>handleButtonClick('save')}> save </button>
            <button className = {styles.Load} onClick={()=>handleButtonClick('load')}> load</button>
            <button className = {styles.Copy} onClick={()=>handleButtonClick('copy')}> copy</button>
        </div>
        
    </div>
  )
}
export default SearchGenerator