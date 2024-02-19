import React from 'react'
import styles from './SearchGenerator.module.css'
//console.log("page hass loaded");
const SearchGenerator = () => {
    let includes:string[] = JSON.parse(localStorage.getItem("prevIncludes") ?? "[]")
    let excludes:string[] = JSON.parse(localStorage.getItem("prevExcludes") ?? "[]")
    if (document.readyState === "complete") {
        handleButtonClick("load");
    } else {
        window.addEventListener("load", ()=>{
            handleButtonClick("load");
        });
    }

    function handleButtonClick(command: string) {
        const display = document.getElementById('display');
        let current = display?.innerHTML
        const exclude = (document.getElementById('exclude')as HTMLInputElement).value
        const include = (document.getElementById('include')as HTMLInputElement).value
        const modal = document.getElementById('myModal');
        const editModal = document.getElementById('editModal');
        const message = document.getElementById('modalMessage');
        
        const add = () => {
            if (current === '' && include !== '' ){
                display!.innerHTML = `"${include}"`;
                includes.push(include);
                edit();
            }else if(include !== ''){
                display!.innerHTML = `"${include}" OR ${current}`;
                includes.push(include);
                edit();
            }
            (document.getElementById('include')as HTMLInputElement).value = ''
        }

        const edit = () => {
            const tableBody = document.querySelector("#myTable tbody");
            if (tableBody) {
                const len = includes.length > excludes.length ?  includes.length : excludes.length;
                for (let i = 0; i < len; i++) {
                    const row = document.createElement("tr");
                    let currInc = includes[i] ? includes[i] : ""
                    let currExc = excludes[i] ? excludes[i] : ""
                    row.innerHTML = `
                    <td>${currInc}</td>
                    <td>${currExc}</td>
                    `;
                tableBody.appendChild(row);
                }
            }
        }

        const ignore = () => {
            if (exclude !== '' && current !== ''){
                excludes.push(exclude)
                display!.innerHTML = `${current} NOT "${exclude}"`;
                (document.getElementById('exclude')as HTMLInputElement).value = '';
                edit();
            }

        }
    
        switch (command) {
            case 'add':
                add();
                break;
            case 'ignore':
                ignore();
                break;
            case 'clear':
                display!.innerHTML = ''
                break;
            case 'save':
                if (current !== ''){
                    localStorage.setItem('prevResult',current!);
                    localStorage.setItem('prevIncludes',JSON.stringify(includes))
                    localStorage.setItem('prevExcludes',JSON.stringify(excludes))
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
                    editModal!.style.display = 'none';
                break;
            case 'edit':
                if (excludes && includes && editModal){
                    console.log(excludes, includes);
                    editModal.style.display = 'block';
                }
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
            <button className = {styles.Copy} onClick={()=>handleButtonClick('edit')}> edit</button>
        </div>
        <div id="myModal" className= {styles.modal}>
            <div className={styles.modalContent}>
            <span onClick={()=>handleButtonClick('closeModal')} className= {styles.close}>&times;</span>
            <p id="modalMessage"></p>
            </div>
        </div>
        <div id="editModal" className= {styles.modal}>
            <div className={styles.modalContent}>
            <span onClick={()=>handleButtonClick('closeModal')} className= {styles.close}>&times;</span>
            <table id="myTable">
            <thead>
                <tr>
                    <th>Includes</th>
                    <th>Excludes</th>
                </tr>
            </thead>
                <tbody></tbody>
            </table>
            </div>
        </div>
{/*         <div className = {styles.Footer}>Footer</div>
 */}
        
    </div>
  )
}
export default SearchGenerator