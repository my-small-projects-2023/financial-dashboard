import { Box } from '@chakra-ui/react'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts'
import { ExchangeData } from '../../models/ExchangeRateData'
import { useEffect, useState } from 'react'
import dashboardData from '../../config/dashboard-config.json'

interface Props {
    data: ExchangeData[]
}

const ExchangeDiagram = ({data}: Props) => {
    
    const colors = dashboardData.rateDiagramColors; 
    const [keys, setKeys] = useState<string[]>([]);

    useEffect(() => {
        let keysSet: string[] = [];
        if (data && data.length > 0) {
            keysSet = Object.keys(data[0]);
            keysSet.shift(); 
        }
        setKeys(keysSet);
    }, [data]);
    
  return (
    <Box>
        <ResponsiveContainer width="95%" height={250}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    {keys.length !== 0 &&
                        keys.map((e, i) => (
                            <linearGradient key={i} id={`color${e}`} x1="0" y1="0" x2="0" y2="1">
                                <stop 
                                    offset="5%" 
                                    stopColor={colors[i]} 
                                    stopOpacity={0.8} 
                                />
                                <stop 
                                    offset="95%" 
                                    stopColor={colors[i]} 
                                    stopOpacity={0} 
                                />
                            </linearGradient>
                    ))}
                </defs>
                <XAxis dataKey="date" />
                <YAxis type="number" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                    {keys.length !== 0 &&
                        keys.map((e, i) => (
                        <Area
                            key={i}
                            type="monotone"
                            dataKey={e}
                            stroke={colors[i]}
                            fillOpacity={1}
                            fill={`url(#color${e})`}
                        />
                    ))}
            </AreaChart>
        </ResponsiveContainer>
    </Box>
  )
}

export default ExchangeDiagram
