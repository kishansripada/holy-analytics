declare module "react" {
   interface HTMLAttributes<T> extends DOMAttributes<T> {
      "data-hyperuser"?:
         | "you_can_also_show_modals_element"
         | "watch_a_demo_element"
         | "this_text_says_developers"
         | "this_is_our_logo_element"
         | null;
   }
}
export interface EmbedProps {
   disabled?: boolean;
   darkMode?: boolean;
   userId: string;
   apiKey: string;
   user: any;
}
const eventIds = ["user_clicks_start_onboarding_on_landing_page"] as const;
type EventId = (typeof eventIds)[number];
const deploymentIds = ["1b6b1979-0d47-40e6-af86-e872a42d0300"] as const;
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
      console.warn(
         "[hyperuser]: the hyperuser script tag was not properly loaded, or is blocked and you attempting to call a function from hyperuser"
      );
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
