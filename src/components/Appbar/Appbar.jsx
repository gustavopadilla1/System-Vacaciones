import React  from 'react'
import {AppBar, Toolbar, Typography, Box,  Button } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu'
import {getAuth,signOut} from 'firebase/auth';
import firebaseApp from '../../Config/Credenciales'


const auth = getAuth(firebaseApp);

function Appbar() {
    
  return (
    
    <div>
       <div> 
      
        
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static"  color='primary'>
                {/* <AppBar position="fixed" color='primary'> */}
                                        <Toolbar>
                            {/* <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton> */}

                        <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>                        
                        {/* Home                                                 */}
                        </Typography>
                        
                        <Button color="inherit" onClick={()=> signOut(auth)} >
                            salir
                    </Button>  
                                                               
                    
               
                    </Toolbar>
              </AppBar>
            </Box>
        </div>


   

    </div>
  )
}

export default Appbar
