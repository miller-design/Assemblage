import BaseTheme from './BaseTheme'  // put all global dependencies in here (things used on every page)
import Burger from './c-Burger'
import BurgerMenu from './c-BurgerMenu'
import TopNav from './c-TopNav'
import Form from './Form'


// GLOBAL HANDLERs
// use from WITHIN your component class to add an instance!
global.scrollEvents = []
global.resizeEvents = []
global.scrollDirection


const components = {
	"BaseTheme": BaseTheme, //rqd
	"Burger": Burger,
	"BurgerMenu": BurgerMenu,
	"TopNav": TopNav,
	"Form": Form
}

export default components;
