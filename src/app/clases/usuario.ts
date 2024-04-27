import { Firestore, addDoc, collection, query, getDocs } from '@angular/fire/firestore';

export class Usuario 
{
    private correo: string
    private clave: string;

    constructor(email: string, password: string, private firestore: Firestore, user: string = '')
    {
        this.correo = email;
        this.clave = password;
    }

    async traerFs(): Promise<any[]> 
    {
        const colRef = collection(this.firestore, 'usuarios');
        const q = query(colRef);

        try 
        {
            const querySnapshot = await getDocs(q);
            const data: any[] = [];

            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });

            return data;
        } 
        catch (error) 
        {
            console.error('Error al obtener datos de Firestore:', error);
            throw error;
        }
    }

    buscarEnLista(usuarios:any[]) : boolean
    {
        let ret = false;

        usuarios.forEach((u)=>
        {
            if(u.clave === this.clave && this.correo === u.correo)
            {
                ret = true;
            }
        });

        return ret;
    }
}