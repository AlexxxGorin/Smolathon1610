import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import chevronDown from "./assets/chevron-down.svg";
import chevronDownDisabled from "./assets/chevron-down-disabled.svg";
import styles from './styles.module.css';
import { additional, tagsList } from "./objects";
import './App.css'

const handleTag = (key, tags, func, event) => {
  event.stopPropagation();
  func(tags.filter(item => item !== key));
}

const renderTag = (key, list, tags, func) => {
  // console.log('log', key, list, tags)
  var em = list[key["name"]];
  var text = key["name"];
  if (Object.keys(list).includes(key["name"]))
  return (
    <div onClick={(event) => handleTag(key, tags, func, event)} className='tag-app-active'><h3>{em} {text.charAt(0).toUpperCase() + text.slice(1)}</h3></div>
  )
}


export const DefaultExpansion = ({ customDisabled, header, ...rest }) => (
  <Item
    {...rest}
    header={
      <>
        {header}
        <img className={styles.chevron} src={customDisabled ? chevronDownDisabled : chevronDown} alt="Chevron Down" />
      </>
    }
    className={styles.item}
    buttonProps={{
      className: ({ isEnter }) =>
        customDisabled ? `${styles.itemBtnDisabled} ${isEnter && styles.itemBtnExpanded}` : 
        `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`
    }}
    contentProps={{ className: styles.itemContent }}
    panelProps={{ className: customDisabled ? styles.itemPanelDisabled : styles.itemPanel }}
  />
);

export const ToggleableExpansion = ({customDisabled, keys, list, func, header, ...rest}) => (
  <Item
    {...rest}
    header={
      <>
        {/* {console.log('meow',keys, list, keys.filter(el => Object.keys(list).includes(el)) )} */}
        {/* { ? header : <div/>} */}
        <div className="tag-app-container">
        {/* {console.log('yo', list, keys)} */}
        {keys !== undefined ? keys.filter(el => Object.keys(list).includes(el['name'])).length != 0 ?
        keys.map((key) => {
          return renderTag(key, list, keys, func);
        }) : header : <div/>}
        </div>
        <img className={styles.chevron} src={customDisabled ? chevronDownDisabled : chevronDown} alt="Chevron Down" />
      </>
    }
    className={styles.item}
    buttonProps={{
      className: ({ isEnter }) =>
        customDisabled ? `${styles.itemBtnDisabled} ${isEnter && styles.itemBtnExpanded}` : 
        `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`
    }}
    contentProps={{ className: styles.itemContent }}
    panelProps={{ className: customDisabled ? styles.itemPanelDisabled : styles.itemPanel }}
  />
);

const handleFeature = (key, tags, majorKey, func, event) => {
  event.stopPropagation();
  // console.log(key, tags, majorKey)
  func(prevMyData => ({
    ...prevMyData,
    [majorKey]: prevMyData[majorKey].filter(string => string !== key),
  }));
}

const renderFeature = (key, typ, list, tags, func) => {
  // console.log('log', tags, list)
  var em = list[key[typ]];
  var text = key;
  if (Object.keys(list).includes(key) || list.includes(key))
    return (
      <div onClick={(event) => handleFeature(key, tags, typ, func, event)} className='tag-app-active'><h3>{em} {text.charAt(0).toUpperCase() + text.slice(1)}</h3></div>
    )
}


export const FeaturesExpansion = ({customDisabled, keys, list, typ, func, header, ...rest}) => (
  <Item
    {...rest}
    header={
      <>
        {/* {console.log('meow',keys, list, keys.filter(el => Object.keys(list).includes(el)) )} */}
        {/* { ? header : <div/>} */}
        <div className="tag-app-container">
        
        {keys !== undefined ? Object.keys(keys).includes(typ) ? keys[typ].length != 0 ?
        keys[typ].map((key1) => {
          return renderFeature(key1, typ, list, keys, func);
        }) : header : header : <div/>}
        </div>
        <img className={styles.chevron} src={customDisabled ? chevronDownDisabled : chevronDown} alt="Chevron Down" />
      </>
    }
    className={styles.item}
    buttonProps={{
      className: ({ isEnter }) =>
        customDisabled ? `${styles.itemBtnDisabled} ${isEnter && styles.itemBtnExpanded}` : 
        `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`
    }}
    contentProps={{ className: styles.itemContent }}
    panelProps={{ className: customDisabled ? styles.itemPanelDisabled : styles.itemPanel }}
  />
);