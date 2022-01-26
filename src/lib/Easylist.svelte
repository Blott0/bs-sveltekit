<script>


import { slide } from 'svelte/transition';
import { tick } from 'svelte';

export let itemsArray;
export let listSettings;

let searchValue = '';
let searchEnabled = false;
let matches = {};
let itemsExpanded = [];

let upperspacer, lowerspacer, toolbar;
let upperSpacerHeight = 0;

let scrollY;

$: sortedColumn = listSettings.sort ? listSettings.sort : '' ;
$: sortedKey = sortedKey ? sortedKey : listSettings.sort ? listSettings.sort : false;

$: defaultColumnWidth = listSettings ? getSparewidth(listSettings.columns) : 100 ;

$: filteredItems = searchValue && searchEnabled ? filterItems(itemsArray, listSettings.search) : itemsArray && itemsArray.length > 0 ? itemsArray : [] ;
$: sortedItems = sortedKey ? sortItems(filteredItems) : filteredItems;

$: if (searchValue.length == 0) {
    matches = {};
}

function filterItems(array, values) {
    
    let reg;
    let caseSense = false;

    if (caseSense) {
        reg = new RegExp(searchValue, "g");
    }
    else {
        reg = new RegExp(searchValue, "gi");
    }
    let newList = [];
    values.forEach( v => {
        const addList = array.filter( item => {
            if ( item[v] ) {
                if ( !matches[item._id] ) {
                    matches[item._id] = {};
                }
                matches[item._id][v] = {};
                const matchArray = [...item[v].matchAll(reg)];
                if ( matchArray.length > 0 ) {
                    matches[item._id][v] = matchArray;
                    matches = matches;
                    return true;
                }
                else {
                    delete matches[item._id];
                    matches = matches;
                    return false;
                }
            }
            else {
                delete matches[item._id];
                matches = matches;
                return false;
            }
        });
        if (newList.length > 0 && addList.length > 0) {
            let remove = [];
            newList.forEach( (newItem, newI) => {
                addList.forEach( addItem => {
                    if ( addItem._id === newItem._id ) {
                        remove = [...remove, newI];
                    }
                });
            });
            if (remove.length > 0) {
                remove.reverse().forEach( itemIndex => {
                    newList.splice(itemIndex, 1);
                });
            }
        }
        newList = [...newList, ...addList];
    });
    return newList;
}

function sortItems(items) {
    items.sort(compareItems);
    return items;
}

function compareItems(a, b) {
    if (sortedKey) {
        if (sortedKey.substring(0,1) === '-') {
            return a[sortedKey.substring(1)] > b[sortedKey.substring(1)] ? -1 : a[sortedKey.substring(1)] < b[sortedKey.substring(1)] ? 1 : 0 ;
        }
        return a[sortedKey] > b[sortedKey] ? 1 : a[sortedKey] < b[sortedKey] ? -1 : 0 ;
    }
    return 0;
}

function getSparewidth(columns) {
    let width = 100;
    let columnnumber = columns.length;
    columns.forEach((col, index) => {
        if (col.width) {
            columnnumber--;
            width = width - col.width;
        }
    });
    if ((width > 0) && (columnnumber > 0)) {
        return (width / columnnumber);
    }
}

function stringReplace(str, matches) {
    const values = matches.map(m => m[0]).filter((v, i, a) => a.indexOf(v) === i);
    let newString = str;
    values.forEach(value => {
        const reg = new RegExp(value, 'g');
        newString = newString.replace(reg, '<mark>' + value + '</mark>');
    });
    return newString;
}

function drawArray(item, array, iteration) {
    const caseSense = false;
    let html = '';
    iteration++;
    array.forEach((data, i) => {
        html = html + '<div class="layer' + iteration + '-' + i + '">';
        if (Array.isArray(data)) {
            html = html + addLayer(item, data, iteration);
        }
        else if (data.function && typeof(data.function) === 'function') {
            html = html + data.function(item[data.key[0]], item[data.key[1]], item[data.key[2]], item[data.key[3]]);
        }
        else if (searchEnabled && Object.keys(matches).includes('' + item._id) && Object.keys(matches['' + item._id]).includes(data.key)) {
            html = html + stringReplace(item[data.key], matches['' + item._id][data.key]);
        }
        else {
            html = html + item[data.key];
        }
        html = html + '</div>';
    });
    return html;
}

function addLayer(item, array, iteration) {
    return drawArray(item, array, iteration);
}

function toggleExpand(id) {
    if (itemsExpanded.includes(id)) {
        for (let i = 0; i < itemsExpanded.length; i++) {
            if (itemsExpanded[i] === id) {
                itemsExpanded.splice(i, 1);
                itemsExpanded = itemsExpanded;
                return;
            }
        }
    }
    else {
        itemsExpanded.push(id);
        itemsExpanded = itemsExpanded;
    }
}

function sortBy(opkey, col) {
    if (!opkey.noSort) {
        sortedColumn = opkey.title;
        if (Array.isArray(opkey.data)) {
            if (listSettings.columns[col].sort && listSettings.columns[col].sort.length > 0) {
                if (Array.isArray(listSettings.columns[col].sort)) {
                    let newSortKey = '';
                    listSettings.columns[col].sort.forEach((key, i) => {
                        if ((key === sortedKey) || (key === sortedKey.substring(1) && sortedKey.substring(0,1) === '-')) {
                            if (sortedKey.substring(0,1) === '-') {
                                newSortKey = (i + 1) > listSettings.columns[col].sort.length -1 ? 0 : i + 1 ;
                            }
                            else {
                                newSortKey = '-' + i;
                            }
                        }
                        else if (newSortKey === '') { newSortKey = 0 }
                    });
                    newSortKey = typeof(newSortKey) === 'string' ? newSortKey : '' + newSortKey;
                    sortedKey = newSortKey.substring(0,1) === '-' ? '-' + listSettings.columns[col].sort[newSortKey.substring(1)] : listSettings.columns[col].sort[newSortKey] ;
                }
                else {
                    sortedKey = (listSettings.columns[col].sort === sortedKey) ? '-' + listSettings.columns[col].sort : listSettings.columns[col].sort;
                }
            }
        }
        else {
            if (opkey.data.key === sortedKey) {
                sortedKey = '-' + sortedKey;
            }
            else {
                sortedKey = opkey.data.key;
            }
        }
    }
}

function sortedClass(column, cl) {
    if (column.title === sortedColumn) {
        if (cl === 'inverted') {
            if (sortedKey.substring(0,1) === '-') {
                return true;
            }
            else {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}

async function pseudoList(e) {
    await tick();
    const topRect = upperspacer.getBoundingClientRect();
    const lowerRect = lowerspacer.getBoundingClientRect();
    const toolRect = toolbar.getBoundingClientRect();
    if ((topRect.y + topRect.height) - (toolRect.y + toolRect.height) < -1000) {
        // console.log((topRect.y + topRect.height) - (toolRect.y + toolRect.height));
        scrollY = scrollY - 100;
        sortedItems.splice(0,1);
        
        upperSpacerHeight = upperSpacerHeight + 100;
    }
}

</script>

<svelte:window bind:scrollY on:wheel='{e => pseudoList(e)}' />
    
<div class='wrapper {listSettings.name ? listSettings.name : ""}'>
    <div bind:this={toolbar} class='toolbar'>
        <div class='butt'>
            <label on:click='{() => searchEnabled = !searchEnabled}'>search</label>
            <label>items listed: </label>{sortedItems ? sortedItems.length : 0}
            <label>sorted by:  </label>{sortedKey ? sortedKey.substring(0,1) === '-' ? sortedKey.substring(1) : sortedKey : 'none'}
        </div>
        {#if searchEnabled}
        <input bind:value={searchValue} placeholder="search list" transition:slide>
        {/if}
        <div class='listhead'>
            {#each listSettings.columns as column, i}
            <div class='column{i}'
                style='width:{column.width ? column.width : defaultColumnWidth}%'>
                <label class='columntitle'
                    class:sorted='{column.noSort ? false : column.title === sortedColumn}'
                    class:inverted='{column.title === sortedColumn && sortedKey.substring(0,1) === "-"}'
                    on:click='{e => sortBy(column, i)}'>
                    {column.title ? column.title : ''}
                </label>
            </div>
            {/each}
        </div>
    </div>
    <ul>
    <li style='height:{upperSpacerHeight}px' class='upperspacer' bind:this={upperspacer} />
        {#each sortedItems as item, index}
        <li id='{item._id}'>
            <div class='item' on:click='{e => toggleExpand(item._id)}'>
                {#each listSettings.columns as column, i}
                <div class="column{i}"
                    style='width:{column.width ? column.width : defaultColumnWidth}%'>
                    {#if Array.isArray(column.data)}
                        {@html drawArray(item, column.data, 0)}
                    {:else if column.data.function && typeof(column.data.function) === 'function'}
                        {#if Array.isArray(column.data.key)}
                            {@html column.data.function(item[column.data.key[0]], item[column.data.key[1]], item[column.data.key[2]], item[column.data.key[3]])}
                        {:else}
                            {@html column.data.function(item[column.data.key])}
                        {/if}
                    {:else}
                        {#if searchEnabled && Object.keys(matches).includes('' + item._id) && Object.keys(matches['' + item._id]).includes(column.data.key)}
                            {@html stringReplace(item[column.data.key], matches['' + item._id][column.data.key])}
                        {:else}
                            {@html item[column.data.key]}
                        {/if}
                    {/if} 
                </div>
                {/each}
            </div>
            {#if itemsExpanded.includes(item._id) && listSettings.expand}
            <div class='expand' on:click='{(e) => console.log(e)}' transition:slide>
                {#if Array.isArray(listSettings.expand)}
                    {@html drawArray(item, listSettings.expand, 0)}
                {:else}
                    {#if searchEnabled && Object.keys(matches).includes('' + item._id) && Object.keys(matches['' + item._id]).includes(listSettings.expand.key)}
                        {@html stringReplace(item[listSettings.expand.key], matches['' + item._id][listSettings.expand.key])}
                    {:else}
                        {@html item[listSettings.expand.key]}
                    {/if}
                {/if}
            </div>
            {/if}
        </li>
        {/each}
        <li class='lowerspacer' bind:this={lowerspacer} />
    </ul>
</div>
    
<style>

.upperspacer, .lowerspacer {
    margin: 0;
    padding: 0;
}
.item {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.listhead {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.columntitle {
    user-select: none;
    cursor: pointer;
}
label.sorted {
    margin-right: 4px;
}
label.sorted::after {
    content: '';
    display:inline-block;
    height: 6px;
    width: 6px;
    border-left: 2px solid black;
    border-top: 2px solid black;
    transform: translateX(6px) rotate(225deg);
    transition: transform .2s ease-out;
}
label.sorted.inverted::after {
    transform: translateX(6px) rotate(45deg);
}
ul {
    list-style: none;
    padding: 0;
}
li {
    width: 100%;
}

</style>