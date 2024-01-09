// En un archivo llamado callusers.ts
export interface MemberData {
    user: {
      id: number;
      username: string;
      profilePicture: string;
      initials: string;
      color: string;
      email: string;
    };
    // Agrega otros campos según la estructura real de tus datos
  }
  
  interface TeamData {
    members: MemberData[];
  }
  
  export const fetchUsersClickUp = async (): Promise<TeamData[]> => {
    try {
      const resp = await fetch(
        'https://api.clickup.com/api/v2/team',
        {
          method: 'GET',
          headers: {
            Authorization: 'pk_67345527_TLBZHQPZ6ZA8I21222OR8MDQEJR1ZO0X'
          }
        }
      );
  
      const data = await resp.json();
      const teams: TeamData[] = data.teams;
  
      return teams;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };