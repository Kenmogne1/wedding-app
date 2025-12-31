import React, { useState } from 'react';
import { Search, Lock, ArrowLeft } from 'lucide-react';

// --- CONFIGURATION ---
const CONFIG = {
  coupleNames: "Fabrice\u00A0&\u00A0Caïus",
  groomName: "Fabrice",
  brideName: "Caïus",
  weddingDate: "2026-04-04T20:00:00",
  venue: "Yaoundé, Quartier Manguier",
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
};

// --- COMPOSANT ADMIN ---
const AdminPage = ({ onNavigate, onGoBack }) => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [guests, setGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, confirmed: 0, checked: 0 });

  const handleLogin = () => {
    if (password === 'wedding2025') {
      setAuthenticated(true);
      fetchGuests();
      fetchStats();
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const fetchGuests = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${CONFIG.apiUrl}/guests`);
      if (!res.ok) throw new Error('Erreur récupération invités');
      const data = await res.json();
      setGuests(data);
    } catch (error) {
      console.error('Erreur fetchGuests:', error);
      alert('Impossible de récupérer la liste des invités. Vérifiez que le backend est démarré.');
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${CONFIG.apiUrl}/stats`);
      if (!res.ok) throw new Error('Erreur récupération stats');
      const s = await res.json();
      setStats({ total: s.total || 0, confirmed: s.confirmed || 0, checked: s.checkedIn || s.checked || 0 });
    } catch (error) {
      console.error('Erreur fetchStats:', error);
    }
  };

  const handleCheckIn = async (id) => {
    try {
      const res = await fetch(`${CONFIG.apiUrl}/guests/${id}/checkin`, { method: 'PUT' });
      if (!res.ok) throw new Error('Erreur check-in');
      const updated = await res.json();
      setGuests(guests.map(g => g._id === id ? updated : g));
      setStats(prev => ({ ...prev, checked: (prev.checked || 0) + 1 }));
    } catch (error) {
      console.error('Erreur handleCheckIn:', error);
      alert('Impossible de valider l’entrée. Réessayez.');
    }
  };

  const filteredGuests = guests.filter(g =>
    (g.nom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (g.prenom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (g.telephone || '').includes(searchTerm)
  );

  const handleLogout = () => {
    setAuthenticated(false);
    onNavigate('home');
    if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.delete('view');
        window.history.pushState({}, '', url);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black flex items-center justify-center p-4 relative">
        <button onClick={() => (typeof onGoBack === 'function' ? onGoBack() : onNavigate('home'))} className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2">
          <ArrowLeft /> Retour
        </button>
        <div className="bg-white rounded-2xl p-10 max-w-md w-full text-gray-900 card-animate reveal-on-scroll">
          <Lock className="w-16 h-16 mx-auto text-gray-800 mb-6" />
          <h1 className="text-3xl font-bold text-center mb-8">Accès Contrôleur</h1>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-gray-800 outline-none" placeholder="Mot de passe" />
          <button onClick={handleLogin} className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 btn-animate">
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black py-8 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Contrôle des Entrées</h1>
          <button onClick={handleLogout} className="bg-gray-800 px-4 md:px-6 py-2 rounded-lg hover:bg-gray-700 text-sm md:text-base">
            Déconnexion
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 text-center shadow-lg">
            <div className="text-4xl md:text-5xl font-bold mb-2">{stats.total}</div>
            <div className="text-gray-500 uppercase text-xs md:text-sm tracking-wider">Total invités</div>
          </div>
          <div className="bg-green-950 border border-green-900 rounded-2xl p-6 md:p-8 text-center shadow-lg">
            <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">{stats.confirmed}</div>
            <div className="text-green-600 uppercase text-xs md:text-sm tracking-wider">Confirmés</div>
          </div>
          <div className="bg-blue-950 border border-blue-900 rounded-2xl p-6 md:p-8 text-center shadow-lg">
            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">{stats.checked}</div>
            <div className="text-blue-600 uppercase text-xs md:text-sm tracking-wider">Présents</div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-500" />
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-gray-600 outline-none"
                placeholder="Rechercher..." />
            </div>
            <button onClick={fetchGuests} className="bg-gray-800 px-6 py-3 rounded-lg hover:bg-gray-700 w-full md:w-auto">
              Actualiser
            </button>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden overflow-x-auto shadow-xl">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Chargement...</div>
          ) : (
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">Nom</th>
                  <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">Prénom</th>
                  <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">Téléphone</th>
                  {/* COLONNE PERS. SUPPRIMÉE ICI */}
                  <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">Statut</th>
                  <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredGuests.map((guest) => (
                  <tr key={guest._id} className={guest.checkedIn ? 'bg-green-950/30' : 'hover:bg-gray-800/50'}>
                    <td className="px-6 py-4 font-medium">{guest.nom}</td>
                    <td className="px-6 py-4">{guest.prenom}</td>
                    <td className="px-6 py-4 text-gray-400">{guest.telephone}</td>
                    {/* CELLULE PERS. SUPPRIMÉE ICI */}
                    <td className="px-6 py-4">
                      {guest.confirmed ? (
                         guest.checkedIn ? <span className="px-3 py-1 bg-green-900 text-green-400 rounded-full text-xs font-semibold">✓ Présent</span> : <span className="px-3 py-1 bg-blue-900 text-blue-400 rounded-full text-xs font-semibold">Confirmé</span>
                      ) : (
                        <span className="px-3 py-1 bg-red-900/50 text-red-400 rounded-full text-xs font-semibold">Non confirmé</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {guest.confirmed && !guest.checkedIn && (
                        <button onClick={() => handleCheckIn(guest._id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm shadow-md hover:shadow-lg transition-all">
                          Valider
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;