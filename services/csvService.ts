import { AgentMetrics, TeamType } from '../types';

export const fetchSheetData = async (csvUrl: string): Promise<AgentMetrics[]> => {
  try {
    const response = await fetch(csvUrl);
    const text = await response.text();
    return parseCSV(text);
  } catch (error) {
    console.error("Error fetching CSV:", error);
    throw new Error("Failed to load data from Google Sheet. Ensure 'Publish to Web' is active.");
  }
};

const parseCSV = (csvText: string): AgentMetrics[] => {
  const lines = csvText.split('\n').map(line => line.trim()).filter(line => line);
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  
  const agents: AgentMetrics[] = [];

  for (let i = 1; i < lines.length; i++) {
    // Handle simplified CSV parsing (assuming no commas in names for simplicity)
    const currentLine = lines[i].split(',');
    
    if (currentLine.length < headers.length) continue;

    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = currentLine[index]?.trim();
    });

    // Map CSV columns to our AgentMetrics type
    if (row['name']) {
      agents.push({
        id: `row-${i}`,
        name: row['name'] || 'Unknown',
        team: (row['team']?.toUpperCase() === 'NON_HIVA' || row['team']?.toUpperCase() === 'NON-HIVA') ? 'NON_HIVA' : 'HIVA',
        csat: parseFloat(row['csat']) || 0,
        neCrt: parseFloat(row['ne crt'] || row['necrt']) || 0,
        aht: parseFloat(row['aht']) || 0,
        triageSla: parseFloat(row['triage sla'] || row['triagesla'] || row['triage time sla']) || 0,
        lg: parseFloat(row['lg'] || row['lead gen'] || row['lg%']) || 0, // New LG parsing
        qaScore: parseFloat(row['qa score'] || row['qascore']) || 0,
        productiveAux: parseFloat(row['productive aux'] || row['productiveaux']) || 0,
        unplannedLeave: parseFloat(row['unplanned leave'] || row['unplannedleave']) || 0,
        
        // Optional Columns for Deep Dive if they exist
        raScore: parseFloat(row['ra score'] || row['ra']) || undefined,
        hvaIsTimeSla: parseFloat(row['hva is time sla'] || row['hva sla'] || row['is time sla']) || undefined,
        
        avatarUrl: `https://ui-avatars.com/api/?name=${row['name']}&background=random`
      });
    }
  }

  return agents;
};