declare module "react" {
   interface HTMLAttributes<T> extends DOMAttributes<T> {
      "data-hyperuser"?: "watch_a_demo_element" | null;
   }
}
export interface EmbedProps {
   disabled?: boolean;
   darkMode?: boolean;
   userId: string;
   apiKey: string;
   user: any;
}
const eventIds = [] as const;
type EventId = (typeof eventIds)[number];
const deploymentIds = [] as const;
type DeploymentId = (typeof deploymentIds)[number];
type Hyperuser = {
   initialize(params: EmbedProps): void;
   startDeployment(deploymentId: DeploymentId): void;
   /** * Starts a new deployment with the specified deployment ID. * @param deploymentId - The unique identifier of the deployment. */ startDeployment(
      deploymentId: DeploymentId
   ): void;
   trackEvent(eventId: EventId, data?: any): void;
};
const errorBoundary = (functionToExcecute: Function) => {
   if (typeof window !== "undefined" && (window as any).hyperuser) {
      try {
         functionToExcecute();
      } catch {
         console.warn("There was an error excuting a function");
      }
   } else {
   }
};
class hyperuser implements Hyperuser {
   initialize(props: EmbedProps) {
      return errorBoundary((window as any)?.hyperuser?.initialize(props));
   }
   startDeployment(deploymentId: string) {
      return errorBoundary((window as any)?.hyperuser?.startDeployment(deploymentId));
   }
   trackEvent(eventId: EventId, data?: any) {
      return errorBoundary((window as any)?.hyperuser?.trackEvent(eventId, data));
   }
   nextStep(deploymentId: DeploymentId, eventId: EventId) {
      return errorBoundary((window as any)?.hyperuser?.nextStep(deploymentId, eventId));
   }
}
export default new hyperuser();
