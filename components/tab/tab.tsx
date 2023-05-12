import { TabProps } from "./taptypes";

const TabComponent: React.FC<TabProps> = ({ activeTab, onTabChange }) => {
  return (
    <div >
      <div className="flex">
        <button className="w-1/2 border-b-2" onClick={() => onTabChange('delivery')} style={activeTab === 'delivery' ? { fontWeight: 'bold', borderBottom: "2px solid #FF0000", borderRadius:"10%"} : undefined}>
          Delivery
        </button>
        <button className="w-1/2 border-b-2" onClick={() => onTabChange('takeout')} style={activeTab === 'takeout' ? { fontWeight: 'bold', borderBottom: "2px solid #FF0000", borderRadius:"10%" } : undefined}>
          Takeout
        </button>
      </div>
    </div>
  );
};

export default TabComponent;
