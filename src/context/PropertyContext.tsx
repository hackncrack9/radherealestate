import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, LeadInquiry } from '../types/property';
import { PROPERTIES_DATA } from '../data/properties';
import { formatIndianCurrency } from '../utils/formatters';

interface PropertyContextType {
  properties: Property[];
  leads: LeadInquiry[];
  addProperty: (propertyData: Omit<Property, 'id'>) => Property;
  updateProperty: (id: string, propertyData: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  toggleFeatured: (id: string) => void;
  addLead: (leadData: Omit<LeadInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: LeadInquiry['status']) => void;
  deleteLead: (id: string) => void;
  getPropertyBySlug: (slug: string) => Property | undefined;
  getPropertyById: (id: string) => Property | undefined;
  resetToDefaults: () => void;
  exportData: () => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

const STORAGE_KEY_PROPERTIES = 'radhe_properties_store_v1';
const STORAGE_KEY_LEADS = 'radhe_leads_store_v1';

const INITIAL_LEADS: LeadInquiry[] = [
  {
    id: 'lead-001',
    fullName: 'Rajveer Singh Shekhawat',
    phone: '+919829012345',
    email: 'rajveer.shekhawat@example.com',
    propertyInterest: 'The Haveli Courtyard Villa (Civil Lines)',
    budgetRange: '₹ 6 Cr - ₹ 10 Cr',
    preferredDate: '2026-09-15',
    timeSlot: 'Morning (10:00 AM - 1:00 PM)',
    message: 'Interested in scheduling a private on-site inspection this weekend.',
    status: 'New',
    createdAt: '2026-09-11T10:30:00Z',
  },
  {
    id: 'lead-002',
    fullName: 'Pooja Agarwal',
    phone: '+919414098765',
    email: 'pooja.agarwal@example.com',
    propertyInterest: 'The Skyview Penthouse at Central Park (C-Scheme)',
    budgetRange: '₹ 3 Cr - ₹ 6 Cr',
    preferredDate: '2026-09-18',
    timeSlot: 'Evening (4:00 PM - 7:00 PM)',
    message: 'NRI looking for ready-to-move high-rise with Central Park view.',
    status: 'Contacted',
    createdAt: '2026-09-10T15:45:00Z',
  },
];

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Properties State
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROPERTIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading properties from storage:', e);
    }
    return PROPERTIES_DATA;
  });

  // Leads State
  const [leads, setLeads] = useState<LeadInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LEADS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading leads from storage:', e);
    }
    return INITIAL_LEADS;
  });

  // Persist properties
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROPERTIES, JSON.stringify(properties));
    } catch (e) {
      console.error('Error saving properties:', e);
    }
  }, [properties]);

  // Persist leads
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
    } catch (e) {
      console.error('Error saving leads:', e);
    }
  }, [leads]);

  // CRUD Actions
  const addProperty = (data: Omit<Property, 'id'>): Property => {
    const newId = `radhe-prop-${Date.now()}`;
    const autoPriceDisplay = data.priceDisplay || formatIndianCurrency(data.price);
    const autoPerSqFt =
      data.pricePerSqFt ||
      (data.areaSqFt > 0 ? `₹ ${Math.round(data.price / data.areaSqFt).toLocaleString('en-IN')} / sq.ft.` : '');

    const newProperty: Property = {
      ...data,
      id: newId,
      priceDisplay: autoPriceDisplay,
      pricePerSqFt: autoPerSqFt,
      createdAt: new Date().toISOString(),
    };

    setProperties((prev) => [newProperty, ...prev]);
    return newProperty;
  };

  const updateProperty = (id: string, updatedFields: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((prop) => {
        if (prop.id !== id) return prop;

        const merged = { ...prop, ...updatedFields };
        if (updatedFields.price !== undefined && !updatedFields.priceDisplay) {
          merged.priceDisplay = formatIndianCurrency(merged.price);
        }
        if (
          (updatedFields.price !== undefined || updatedFields.areaSqFt !== undefined) &&
          !updatedFields.pricePerSqFt &&
          merged.areaSqFt > 0
        ) {
          merged.pricePerSqFt = `₹ ${Math.round(merged.price / merged.areaSqFt).toLocaleString('en-IN')} / sq.ft.`;
        }
        return merged;
      })
    );
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((prop) => prop.id !== id));
  };

  const toggleFeatured = (id: string) => {
    setProperties((prev) =>
      prev.map((prop) => (prop.id === id ? { ...prop, featured: !prop.featured } : prop))
    );
  };

  const addLead = (leadData: Omit<LeadInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newLead: LeadInquiry = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const updateLeadStatus = (id: string, status: LeadInquiry['status']) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  const getPropertyBySlug = (slug: string) => {
    return properties.find((p) => p.slug === slug);
  };

  const getPropertyById = (id: string) => {
    return properties.find((p) => p.id === id);
  };

  const resetToDefaults = () => {
    setProperties(PROPERTIES_DATA);
    setLeads(INITIAL_LEADS);
    localStorage.removeItem(STORAGE_KEY_PROPERTIES);
    localStorage.removeItem(STORAGE_KEY_LEADS);
  };

  const exportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      properties,
      leads,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `radhe-real-estate-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        leads,
        addProperty,
        updateProperty,
        deleteProperty,
        toggleFeatured,
        addLead,
        updateLeadStatus,
        deleteLead,
        getPropertyBySlug,
        getPropertyById,
        resetToDefaults,
        exportData,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};
