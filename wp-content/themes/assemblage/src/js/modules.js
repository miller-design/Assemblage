import BaseTheme from './BaseTheme'  // put all global dependencies in here (things used on every page)
import Burger from './c-Burger'
import BurgerMenu from './c-BurgerMenu'
import TopNav from './c-TopNav'
import Form from './Form'
import Video from './c-Video'
import NewsletterSignup from './c-NewsletterSignup'
import ProgressBar from './c-ProgressBar'
import ImageSlider from './c-ImageSlider'
import PostSlider from './c-PostSlider'
import IssueHeader from './c-IssueHeader'


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
	"Form": Form,
	"Video": Video,
	"NewsletterSignup": NewsletterSignup,
	"ProgressBar": ProgressBar,
	"ImageSlider": ImageSlider,
	"PostSlider": PostSlider,
	"IssueHeader": IssueHeader
}

export default components;
