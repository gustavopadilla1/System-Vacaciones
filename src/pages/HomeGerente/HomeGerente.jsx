import React from 'react';

import TEAMFOREIGN from '../../components/TEAMFOREIGN';
import TEAMADMIN from '../../components/TEAMADMIN/TEAMADMIN';
import TEAMFISCAL from '../../components/TEAMFISCAL';
import TEAMDIRECCIÓN from '../../components/TEAMDIRECCION';
import DirectorGeneral from '../../components/DirectorGeneral'


function HomeGerente({ user }) {
    
    return (
        
        <div>



                {user['EQUIPO DE TRABAJO'] === 'TEAM FOREIGN' ? <TEAMFOREIGN user={user} />  : <div></div>}
                {user['EQUIPO DE TRABAJO'] === 'TEAM ADMIN' ? <TEAMADMIN user={user} /> : <div></div>}
                {user['EQUIPO DE TRABAJO'] === 'TEAM FISCAL' ? <TEAMFISCAL user={user} /> : <div></div>}
                {user['EQUIPO DE TRABAJO'] === 'TEAM DIRECCION' ? <TEAMDIRECCIÓN user={user} /> : <div></div>}

                {user['AREA FUNCIONAL'] === 'Dirección General' ? <DirectorGeneral user={user} /> : <div></div>}


        </div>
    )
}


export default HomeGerente