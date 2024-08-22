import { DashboardDataType } from "@/types";

export const DashboardData: DashboardDataType = {
  title: "CNAPP Dashboard",
  categories: [
    {
      id: "CSPM",
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "cloud_accounts_summary",
          name: "Cloud Accounts Summary",
          selected: true,
          text: "",
          type: "pie_chart",
          data: [
            { name: "Connected", value: 2 },
            { name: "Not Connected", value: 2 },
          ],
        },
        {
          id: "cloud_account_rink_management",
          name: "Cloud Account Rink Management",
          text: "",
          selected: true,
          type: "pie_chart",
          data: [
            { name: "Failed", value: 1689 },
            { name: "Warning", value: 681 },
            { name: "Not Available", value: 36 },
            { name: "Passed", value: 7253 },
          ],
        },
        {
          id: "vinod",
          name: "vinod",
          text: "",
          selected: false,
        },

      ],
    },
    {
      id: "CWPP",
      name: "CWPP Dashboard",
      widgets: [
        {
          id: "Top 5 Namespace Specific Alerts",
          name: "Top 5 Namespace Specific Alerts",
          selected: true,
          text: "",
          type: "table",
          data: [],
        },
        {
          id: "workload_alerts",
          name: "Workload Alerts",
          selected: false,
          text: "",
          type: "bar_chart",
          data: [],
        },
      ],
    },
    {
      id: "Registry Scan",
      name: "Registry Scan",
      widgets: [
        {
          id: "image_risk_assessment",
          name: "Image Risk Assessment",
          selected: true,
          text: "",
          type: "gauge",
          data: [
            { name: "Critical", value: 2 },
            { name: "High", value: 12 },
          ],
        },
        {
          id: "image_security_issues",
          name: "Image Security Issues",
          selected: true,
          text: "",
          type: "bar_chart",
          data: [
            { name: "Critical", value: 2 },
            { name: "High", value: 12 },
          ],
        },
      ],
    },
  ],
};
