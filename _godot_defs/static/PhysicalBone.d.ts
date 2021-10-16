
/**
*/
declare class PhysicalBone extends PhysicsBody {

  
/**
*/
  "new"(): PhysicalBone;
  static "new"(): PhysicalBone;











/** No documentation provided. */
apply_central_impulse(impulse: Vector3): void;

/** No documentation provided. */
apply_impulse(position: Vector3, impulse: Vector3): void;

/** No documentation provided. */
get_bone_id(): int;

/** No documentation provided. */
get_simulate_physics(): boolean;

/** No documentation provided. */
is_simulating_physics(): boolean;

/** No documentation provided. */
is_static_body(): boolean;

  // connect<T extends SignalsOf<PhysicalBone>, U extends Node>(signal: T, node: U, method: keyof U): number;
  connect<T extends SignalsOf<PhysicalBoneSignals>>(signal: T, method: SignalFunction<PhysicalBoneSignals[T]>): number;



/** No documentation provided. */
static JOINT_TYPE_NONE: any;

/** No documentation provided. */
static JOINT_TYPE_PIN: any;

/** No documentation provided. */
static JOINT_TYPE_CONE: any;

/** No documentation provided. */
static JOINT_TYPE_HINGE: any;

/** No documentation provided. */
static JOINT_TYPE_SLIDER: any;

/** No documentation provided. */
static JOINT_TYPE_6DOF: any;

}

declare class PhysicalBoneSignals extends PhysicsBodySignals {
  
}
