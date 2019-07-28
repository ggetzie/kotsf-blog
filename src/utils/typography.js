import Typography from "typography"
import lincolnTheme from "typography-theme-lincoln"


lincolnTheme.overrideStyles = () => ({
    '.navigation a': {
        textDecoration: 'none',
    },
    'a.brand': {
        textDecoration: 'none',
        color: 'inherit',
    },
    'a.brand:visited': {
        color: 'inherit',
    },
    '.navigation ul': {
        clear: 'both',
	    float: 'right',
	    listStyle: 'none inside',
        color: '#333',
        padding: '0',
        margin: '0 0 1.5rem 0',
    },
    'nav.navigation': {
        marginTop: '1rem',
    },
})

const typography = new Typography(
    lincolnTheme
);

if (process.env.NODE_ENV !== 'production') {
    typography.injectStyles()
  }

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale